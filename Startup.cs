using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using pivotal.BL;
using pivotal.BL.Interfaces;
using pivotal.DAL;
using pivotal.DAL.Interfaces;
using pivotalHeroku.Utils;

namespace pivotalHeroku
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

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "pivotalHeroku", Version = "v1" });
            });
            services.Configure((System.Action<PivotalConfiguration>)(options => Configuration.GetSection("pivotal").Bind(options)));
            services.AddSingleton<IProjectBL, ProjectBL>();
            services.AddSingleton<IStoryBL, StoryBL>();
            services.AddSingleton<IUserBL, UserBL>();
            services.AddSingleton<IProjectDAL, ProjectDAL>();
            services.AddSingleton<IStoryDAL, StoryDAL>();
            services.AddSingleton<IUserDAL, UserDAL>();
            services.AddTransient<Jwt>();

            // services.AddAuthentication(options =>
            // {
            //     options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //     options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            // })
            // .AddCookie();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "pivotalHeroku v1"));
            }
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                HttpOnly = HttpOnlyPolicy.Always
            });

            app.UseRouting();
            app.UseCors(x => x
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true) // allow any origin
            .AllowCredentials());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
