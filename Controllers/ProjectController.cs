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
using pivotalHeroku.Utils;
using pivotal.Enum.ResponseEnum;

namespace pivotalHeroku.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class ProjectController : ControllerBase
    {
        // https://codeforces.com/blog/entry/92223
        private readonly IProjectBL _project;
        private readonly Jwt _jwt;
        private const string _jwtCookieName = "jwt";
        // string ConnectionString1 = "SERVER=127.0.0.1;Port=3306;UID=root;PASSWORD=Mango@Pine;DATABASE=pivotal;UseAffectedRows=True";
        // string connectionString2 = "SERVER=remotemysql.com;Port=3306;UID=3t0jhQo36v;PASSWORD=nxwVLNMN09;DATABASE=3t0jhQo36v";
        public ProjectController(IProjectBL project, Jwt jwt)
        {
            _project = project;
            _jwt = jwt;
        }

        [HttpGet]
        [Route("get/project/{projectId}/")]
        public async Task<IActionResult> Get(int projectId)
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            var project = await _project.GetProjectById(projectId, userId);
            if (project == null)
            {
                if (userId == 0)
                {
                    return Ok(new { project = "This project is not available. Try signing in", success = 0 });
                }
                return Ok(new { project = "You either don't have access to this prject or it doesn't exist", success = 0 });
            }
            return Ok(new { project = project });
        }
        [HttpGet]
        [Route("get/allprojects/")]
        public async Task<IActionResult> GetAllProjects()
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            return Ok(new { projectList = await _project.GetProjectsByUserId(userId) });
            // return Ok(new {projectList = new List<ProjectDto>()});
        }
        [HttpPost("create/project/")]
        public async Task<IActionResult> Post(ProjectDto project)
        {
            int userId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (userId == 0)
            {
                return BadRequest(new { message = "You need to be signed in to create a project" });
            }
            int projectId = await _project.AddProject(project.Name, project.IsPublic, userId);
            if (projectId == 0)
            {
                return Ok(new { message = "some error occured while creating your project. Please try again" });
            }
            return Ok(new { message = "project created successfully", projectId = projectId });
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

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUserToProject(AddUserToProjectDto request)
        {
            if (request.ProjectId == 0 || string.IsNullOrEmpty(request.Email))
            {
                return BadRequest(new { message = "invalid request" });
            }
            int loggedInUserId = _jwt.GetUserIdByJwt(Request.Cookies[_jwtCookieName]);
            if (loggedInUserId == 0)
            {
                return BadRequest(new { message = ResponseEnum.NotAuthenticated});
            }
            request.LoggedInUserId = loggedInUserId;
            string res = await _project.AddUserToProject(request);
            if (res == ResponseEnum.Success)
            {
                return Ok(new { message = res });
            }
            else
            {
                return BadRequest(new { message = res });
            }
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
