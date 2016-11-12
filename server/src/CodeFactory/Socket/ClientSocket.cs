using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CodeFactory.Data.Repository;
using CodeFactory.Simulation;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace CodeFactory.Socket
{
  public class ClientSocket : ISimulatorCommunication
  {
    static Dictionary<Guid, Simulator> mSimulators = new Dictionary<Guid, Simulator>();

    const int cMaxMessageSize = 4096;

    Guid mId = Guid.NewGuid();
    CancellationTokenSource mCancellationTokenSource = new CancellationTokenSource();

    public static async Task<bool> Create(HttpContext context, IApplicationRepository applicationRepository)
    {
      var wSocket = new ClientSocket(context);
      await wSocket.Accept();

      await wSocket.Listen();

      return true;
    }

    private readonly HttpContext mContext;
    private WebSocket mSocket;
    private Simulator mSimulator;

    public ClientSocket(HttpContext context)
    {
      mContext = context;
    }

    public async Task Accept()
    {
      mSocket = await mContext.WebSockets.AcceptWebSocketAsync();
    }

    public async Task Listen()
    {
      string wRequest = "";

      while (mSocket.State == WebSocketState.Open)
      {
        var wToken = CancellationToken.None;
        var wBuffer = new ArraySegment<Byte>(new Byte[cMaxMessageSize]);
        var wReceived = await mSocket.ReceiveAsync(wBuffer, wToken);

        switch (wReceived.MessageType)
        {
          case WebSocketMessageType.Text:
            wRequest += Encoding.UTF8.GetString(wBuffer.Array, wBuffer.Offset, wReceived.Count);
            if (wReceived.EndOfMessage)
            {
              var wAction = JsonConvert.DeserializeObject<ClientAction>(wRequest);
              wRequest = "";
              SendAnswer(wAction, DoAction(wAction));
            }
            break;
          case WebSocketMessageType.Close:
            break;
        }
      }

      lock (mSimulators)
      {
        mSimulator.RemoveSocket(this);
        if (!mSimulator.HasSocket)
        {
          mSimulators.Remove(mSimulator.Id);
        }
      }
    }

    private void SendAnswer(ClientAction action, ActionAnswer answer)
    {
      Send(new ClientAnswer(action, answer));
    }

    public void Send(object data)
    {
      mSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data))), WebSocketMessageType.Text, true, mCancellationTokenSource.Token);
    }

    private ActionAnswer DoAction(ClientAction action)
    {
      switch (action.Action)
      {

      }

      return null;
    }

  }
}
