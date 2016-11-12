using System;
using System.ComponentModel.DataAnnotations;

namespace CodeFactory.Data.Context
{
  public class SeedHistory
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public DateTime Date { get; set; }
  }
}
