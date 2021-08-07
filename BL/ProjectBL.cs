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
using pivotal.DAL.Interfaces;
using pivotal.BL.Interfaces;

namespace pivotal.BL
{
    public class ProjectBL : IProjectBL
    {
        IProjectDAL _project;
        public ProjectBL(IProjectDAL project)
        {
            _project = project;
        }
        public async Task<ProjectDto> GetProjectById(int projectId, int userId)
        {
            return await _project.GetProjectById(projectId, userId);
        }
        public async Task<int> AddProject(string name, bool isPublic, int ownerId)
        {
            return await _project.AddProject(name, isPublic, ownerId);
        }
        public async Task<bool> DeleteProject(int projectId)
        {
            return await _project.DeleteProject(projectId);
        }
        public async Task<bool> UpdateProject(int id, string name, bool isPublic)
        {
            return await _project.UpdateProject(id, name, isPublic);
        }
        public async Task<List<ProjectDto>> GetProjectsByUserId(int userId) {
            return await _project.GetProjectsByUserId(userId);
        }
    }
}