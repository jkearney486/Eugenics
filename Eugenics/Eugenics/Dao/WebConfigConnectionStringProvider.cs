using System.Web.Configuration;

namespace Eugenics.Dao
{
    public class WebConfigConnectionStringProvider : IConnectionStringProvider
    {
        private readonly string _connectionString;

        public WebConfigConnectionStringProvider()
        {
            _connectionString = WebConfigurationManager.ConnectionStrings["Default"].ConnectionString;
        }

        public string ConnectionString
        {
            get { return _connectionString; }
        }
    }
}
