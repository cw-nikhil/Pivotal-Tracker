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


namespace pivotal.BL.Interfaces
{
    public interface IProjectBL
    {
        public Task<ProjectDto> GetProjectById(int projectId);
        public Task<int> AddProject(string name, bool isPublic, int ownerId);
        public Task<bool> DeleteProject(int projectId);
        public Task<bool> UpdateProject(int id, string name, bool isPublic);
    }
}