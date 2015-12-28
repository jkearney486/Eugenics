using Eugenics.Models;
using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IClassDao : IDao
    {
        IEnumerable<Class> GetAll();
        Class GetById(int id);
    }
}
