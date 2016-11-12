using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeFactory.Simulation
{
  public class ActionAnswer
  {
    public bool IsSuccessful { get; set; }
    public string Data { get; set; }

    public ActionAnswer(bool isSuccessful = false, string data = null)
    {
      IsSuccessful = isSuccessful;
      Data = data;
    }
  }
}
