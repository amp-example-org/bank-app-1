using System.Data.Entity;
using Microsoft.Data.SqlClient.EntityFramework;

namespace AcmeBankApp.Data
{
    public class SqlClientDbConfiguration : DbConfiguration
    {
        public SqlClientDbConfiguration()
        {
            SetProviderServices("Microsoft.Data.SqlClient", Microsoft.Data.SqlClient.EntityFramework.SqlProviderServices.Instance);
            SetProviderFactory("Microsoft.Data.SqlClient", Microsoft.Data.SqlClient.SqlClientFactory.Instance);
        }
    }
}
