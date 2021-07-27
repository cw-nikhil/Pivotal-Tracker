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
using Microsoft.Extensions.Options;
using pivotalHeroku;

namespace pivotal.DAL
{
    public class UserDAL : IUserDAL
    {
        IOptions<PivotalConfiguration> _options;
        public UserDAL(IOptions<PivotalConfiguration> options)
        {
            _options = options;
        }
        public async Task<UserDto> GetUserById(int id)
        {
            var d = _options.Value;
            string sql = $"SELECT * FROM {_options.Value.Schema}.User WHERE Id = @id";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var UserList = await con.QueryAsync<UserDto>(sql, new { id });

                    return UserList.FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<UserDto> GetUserByEmail(string email)
        {
            string sql = $"SELECT * FROM {_options.Value.Schema}.User WHERE Email = @email";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    var UserList = await con.QueryAsync<UserDto>(sql, new { email });

                    return UserList.FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public async Task<int> CreateUser(UserDto user)
        {
            string sql = $@"INSERT INTO {_options.Value.Schema}.User(Name, Email, Password)
                            VALUES(@name, @email, @password);
                            SELECT LAST_INSERT_ID();";
            try
            {
                using (IDbConnection con = new MySqlConnection(_options.Value.ConnectionString))
                {
                    int id = await con.ExecuteScalarAsync<int>(
                        sql,
                        new
                        {
                            @name = user.Name,
                            @email = user.Email,
                            @password = user.Password
                        }
                    );
                    return id;
                }
            }
            catch (Exception e)
            {
                if (e.Message.Contains("Duplicate entry")) {
                    return -1;
                }
                return 0;
            }
        }
    }
}