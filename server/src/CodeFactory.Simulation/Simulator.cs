using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CodeFactory.Data.Repository;

namespace CodeFactory.Simulation
{
  public class Simulator
  {
    public Guid Id { get; } = Guid.NewGuid();
    public bool HasSocket { get { return mSockets.Count > 0; } }

    private List<ISimulatorCommunication> mSockets = new List<ISimulatorCommunication>();

    private IApplicationRepository mApplicationRepository;

    private TaskCompletionSource<bool> mActionTaskSource;
    private Task<bool> mInitializeTask;
    private Task<bool> mSimulationTask;
    private CancellationTokenSource mCancellationTokenSource = new CancellationTokenSource();

    private Changes mActionChanges = new Changes();

    private object mLock = new object();

    private Random mRandom = new Random();

    public Simulator(IApplicationRepository applicationRepository)
    {
      mApplicationRepository = applicationRepository;
      mInitializeTask = DoInitialize();
      mActionTaskSource = new TaskCompletionSource<bool>();
      mActionTaskSource.SetResult(true);
    }

    private async Task<bool> DoInitialize()
    {
      await Task.Yield();

      return true;
    }

    private async Task<bool> DoSimulation()
    {
      if (!await mInitializeTask)
      {
        return false;
      }

      while (!mCancellationTokenSource.Token.IsCancellationRequested)
      {
        lock (mLock)
        {
          var wNow = DateTime.UtcNow;

          var wChanges = mActionChanges;
          mActionChanges = new Changes();

          SendMessage(wChanges);
        }

        await Task.Delay(100);
      }

      return true;
    }

    public void SendMessage(object data)
    {
      lock (mSockets)
      {
        foreach (var wSocket in mSockets)
        {
          SendMessage(wSocket, data);
        }
      }
    }

    public void SendMessage(ISimulatorCommunication socket, object data)
    {
      socket.Send(data);
    }

    public void AddSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Add(communication);
        if (mSockets.Count == 1)
        {
          mSimulationTask = DoSimulation();
        }
      }
    }

    public void RemoveSocket(ISimulatorCommunication communication)
    {
      lock (mSockets)
      {
        mSockets.Remove(communication);
        if (mSockets.Count == 0)
        {
          mCancellationTokenSource.Cancel();
        }
      }
    }

    private ActionAnswer GetAction(Func<object> func)
    {
      lock (mLock)
      {
        return new ActionAnswer(true, JsonConvert.SerializeObject(func()));
      }
    }

    private ActionAnswer SimpleAction(Action action)
    {
      lock (mLock)
      {
        action();
        return new ActionAnswer(true);
      }
    }



  }
}
