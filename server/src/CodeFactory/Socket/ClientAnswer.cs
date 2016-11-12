using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFactory.Simulation;

namespace CodeFactory.Socket
{
  public class ClientAnswer
  {
    public ClientAnswer(ClientAction action, ActionAnswer answer)
    {
      Id = action.Id;
      IsSuccessful = answer.IsSuccessful;
      Data = answer.Data;
    }

    public int Id { get; set; }
    public bool IsSuccessful { get; set; }
    public string Data { get; set; }
  }
}
