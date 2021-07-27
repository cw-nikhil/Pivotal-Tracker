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
    public interface IUserBL
    {
        public Task<UserDto> GetUserById(int id);
        public Task<UserDto> GetUserByEmail(string email);
        public Task<int> CreateUser(UserDto user);
        public Task<UserDto> GetLoggedInUser(string jwt);
    }
}