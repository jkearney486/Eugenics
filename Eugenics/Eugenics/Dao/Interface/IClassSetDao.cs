using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IClassSetDao : IDao
    {
        IEnumerable<int> GetByCharacterId(int id);
    }
}
