using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface ISupportDao : IDao
    {
        IEnumerable<int> GetSupports(int id);
    }
}
