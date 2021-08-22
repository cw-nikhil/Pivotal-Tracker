namespace pivotal.Enum.ResponseEnum
{
    public static class ResponseEnum
    {
        public static string InvalidRequest = "Invalid Request";
        public static string NotAuthenticated = "You need to login first";
        public static string NotAuthorized = "You don't have access";
        public static string UserNotExist = "The user doesn't exist";
        public static string ProjectNotExist = "The project doesn't exist";
        public static string EmailAlreadyExists = "The email id already exists. Please try a different one";
        public static string Success = "Operation successful";
        public static string Failure = "Some error occurred";
    }
}