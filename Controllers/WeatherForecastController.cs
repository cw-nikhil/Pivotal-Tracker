using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using pivotal.Models;
using pivotalHeroku.Models;
using Dapper;

namespace pivotalHeroku.Controllers
{
    [ApiController]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        string connectionString1 = "SERVER=127.0.0.1;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=F7NtycWf0x";

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("api/{id}/")]
        public ProjectModel getPriceFromDb(int id)
        {
            string sql = "SELECT * FROM F7NtycWf0x.project WHERE Id = " + id;
            string connectionString = "SERVER=remotemysql.com;Port=3306;UID=F7NtycWf0x;PASSWORD=3n1wCr6EAD;DATABASE=F7NtycWf0x";
            try
            {
                using (IDbConnection con = new MySqlConnection(connectionString))
                {
                    var carList = con.Query<ProjectModel>(sql);

                    return carList.FirstOrDefault();
                }
            }
            catch(Exception e)
            {
                return new ProjectModel();
            }
        }

        [HttpGet("create/{name}")]
        public async Task Create(string name)
        {
            string sql = @"INSERT INTO pivotal.project(Name)
                            VALUES(@name);
                            SELECT LAST_INSERT_ID();";
            string connectionString = "SERVER=127.0.0.1;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=pivotal";
            try
            {
                using (IDbConnection con = new MySqlConnection(connectionString))
                {
                    int id = await con.ExecuteScalarAsync<int>(
                        sql,
                        new
                        {
                            @name = name
                        }
                    );
                }
            }
            catch
            {
                return;
            }
        }

        [HttpGet("tiger1/")]
        public ProjectModel Just1([FromBody] Just a)
        {
            return new ProjectModel
            {
                Name = "fjsdkjfh"
            };
        }

        [HttpPost("tiger5")]
        public ProjectModel Just5([FromBody] Just modelname)
        {
            return new ProjectModel
            {
                Name = "fjsdkjfh"
            };
        }

    }
}
