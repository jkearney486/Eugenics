using Eugenics.Models;
using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface ICharacterDao : IDao
    {
        IEnumerable<Character> GetAll();
        Character GetById(int id);
    }
}
