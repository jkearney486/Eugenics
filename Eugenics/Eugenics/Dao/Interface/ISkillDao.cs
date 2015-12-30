using Eugenics.Models;
using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface ISkillDao : IDao
    {
        IEnumerable<Skill> GetAll();
        Skill GetById(int id);
    }
}
