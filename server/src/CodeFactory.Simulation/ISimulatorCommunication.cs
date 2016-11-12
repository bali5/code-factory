using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFactory.Simulation
{
  public interface ISimulatorCommunication
  {
    void Send(object data);
  }
}
