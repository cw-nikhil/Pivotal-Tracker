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
using pivotal.BL.Interfaces;

namespace pivotalHeroku.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class ProjectController : ControllerBase
    {
        // https://codeforces.com/blog/entry/92223
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectBL _project;
        private readonly string schema = "pivotal";
        string connectionString1 = "SERVER=127.0.0.1;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=pivotal";
        string connectionString = "SERVER=localhost;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=pivotal";
        // string connectionString2 = "SERVER=remotemysql.com;Port=3306;UID=3t0jhQo36v;PASSWORD=nxwVLNMN09;DATABASE=3t0jhQo36v";

        public ProjectController(ILogger<ProjectController> logger, IProjectBL project)
        {
            _logger = logger;
            _project = project;
        }

        [HttpGet]
        [Route("get/project/{id}/")]
        public async Task<ProjectDto> Get(int id)
        {
            return await _project.GetProjectById(id);
        }
        [HttpPost("create/project/")]
        public async Task<int> Post([FromBody] ProjectDto project)
        {
            return await _project.AddProject(project.Name, project.IsPublic);
        }
        [HttpPut("update/project/")]
        public async Task<bool> Put([FromBody] ProjectDto project)
        {
            return await _project.UpdateProject(project.Id, project.Name, project.IsPublic);
        }
        [HttpDelete("delete/project/")]
        public async Task<bool> Delete([FromBody] ProjectDto project)
        {
            return await _project.DeleteProject(project.Id);
        }

        //-----------
        [HttpPost("tiger1")]
        public ProjectDto Just1([FromBody] Just a)
        {
            return new ProjectDto
            {
                Name = "fjsdkjfh"
            };
        }

        [HttpPost("tiger2")]
        public ProjectDto Just5(int Val)
        {
            return new ProjectDto
            {
                Name = "good"
                // https://docs.microsoft.com/en-us/aspnet/core/mvc/models/model-binding?view=aspnetcore-5.0
            };
        }

    }
}
