using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    public class CharactersController : ApiController
    {
        private readonly ICharacterDao _characterDao;

        public CharactersController(ICharacterDao characterDao)
        {
            _characterDao = characterDao;
        }
        
        public IEnumerable<Character> Get()
        {
            return _characterDao.GetAll();
        }
        
        public Character Get(int id)
        {
            return _characterDao.GetById(id);
        }
    }
}
