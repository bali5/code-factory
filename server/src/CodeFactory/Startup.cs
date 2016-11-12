using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeFactory.Data.Repository;
using CodeFactory.Socket;
using CodeFactory.Tools;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CodeFactory
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

      builder.AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddSingleton<IApplicationRepository, ApplicationRepository>();
      services.AddSingleton<ILoggerFactory>((s) => ApplicationLogging.LoggerFactory);

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseWebSockets();

      app.Use(async (context, next) =>
      {
        if (context.WebSockets.IsWebSocketRequest)
        {
          await ClientSocket.Create(context, serviceProvider.GetService<IApplicationRepository>());
        }
        else
        {
          await next();
        }
      });

      //app.Use(async (context, next) =>
      //{
      //  loggerFactory.CreateLogger("Unknown route").LogWarning(context.Request.Path);
      //  context.Response.Redirect($"http://{context.Request.Host}");
      //  await Task.FromResult(false);
      //});
    }
  }
}
