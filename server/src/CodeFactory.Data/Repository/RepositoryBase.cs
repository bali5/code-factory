using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFactory.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace CodeFactory.Data.Repository
{
  public abstract class RepositoryBase<T> where T : ContextBase, new()
  {
    protected T Context { get; }

    protected RepositoryBase()
    {
      Context = new T();
      Create();
    }

    protected RepositoryBase(string path)
    {
      Context = new T();
      Context.Path = path;
      Create();
    }

    private void Create()
    {
      Context.Database.Migrate();
      Context.EnsureSeedData();
    }
  }
}
