using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Monitor__UI.Models;
using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace Monitor__UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // In production, the Angular files will be served from this directory

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(x =>
              {
                  x.RequireHttpsMetadata = false;
                  x.SaveToken = true;
                  x.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuer = false,
                      ValidateAudience = false,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      //ValidIssuer = "Kavosh 3 IMSITracker auth Issuer22222222222222222222222222222",
                      //ValidAudience = "Kavosh 3 IMSITracker auth Audience333333333333333333333333333333",
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Monitor+ auth key111111111111111111111111111111111111111111111111")),
                      ClockSkew = new TimeSpan(00, 01, 00),
                  };
              });
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            var baseAddress = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            string constring = File.ReadAllText(baseAddress + @"\connection.txt");
            services.AddDbContext<DB_Context>(options =>options.UseSqlServer(constring));
            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            //app.UseStaticFiles();
            var baseAddress = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);
            string mediaAddress = File.ReadAllText(baseAddress + @"\mediaAddress.txt");
            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(mediaAddress),
                RequestPath = "/media",
                EnableDirectoryBrowsing = true
            });
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
           

        }
    }
}
