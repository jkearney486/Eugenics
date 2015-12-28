using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    [RoutePrefix("api/characters")]
    public class CharactersController : ApiController
    {
        private readonly ICharacterDao _characterDao;
        private readonly ISupportDao _supportDao;

        public CharactersController(ICharacterDao characterDao, ISupportDao supportDao)
        {
            _characterDao = characterDao;
            _supportDao = supportDao;
        }
        
        [HttpGet, Route("")]
        public IEnumerable<Character> Get()
        {
            return _characterDao.GetAll();
        }
        
        [HttpGet, Route("{id}")]
        public Character Get(int id)
        {
            return _characterDao.GetById(id);
        }

        [HttpGet, Route("{id}/supports")]
        public IEnumerable<int> GetSupports(int id)
        {
            return _supportDao.GetSupports(id);
        }
    }
}
