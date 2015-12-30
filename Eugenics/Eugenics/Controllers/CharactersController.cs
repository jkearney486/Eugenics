using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;

namespace Eugenics.Controllers
{
    [RoutePrefix("api/characters")]
    public class CharactersController : ApiController
    {
        private readonly ICharacterDao _characterDao;
        private readonly ISupportDao _supportDao;
        private readonly IClassSetDao _classSetDao;
        private readonly IInheritanceClassSetDao _inheritanceClassSetDao;
        private readonly IInheritanceSkillDao _inheritanceSkillDao;

        public CharactersController(ICharacterDao characterDao, 
            ISupportDao supportDao, IClassSetDao classSetDao, 
            IInheritanceClassSetDao inheritanceClassSetDao, 
            IInheritanceSkillDao inheritanceSkillDao)
        {
            _characterDao = characterDao;
            _supportDao = supportDao;
            _classSetDao = classSetDao;
            _inheritanceClassSetDao = inheritanceClassSetDao;
            _inheritanceSkillDao = inheritanceSkillDao;
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

        [HttpGet, Route("{id}/classes")]
        public IEnumerable<int> GetClasses(int id)
        {
            return _classSetDao.GetByCharacterId(id);
        }

        [HttpGet, Route("{id}/parents/{femaleParentId}/{maleParentId}/classes")]
        public IEnumerable<int> GetClasses(int id, int femaleParentId, 
            int maleParentId)
        {
            var gender = _characterDao.GetGender(id);
            var maleChild = gender == "Male" ? true : false;
            var femaleChild = gender == "Female" ? true : false;
            var childClassSet = _classSetDao.GetByCharacterId(id);
            var inheritedClassSet = _inheritanceClassSetDao.GetByParents(maleParentId, 
                femaleParentId, maleChild, femaleChild);
            return childClassSet.Union(inheritedClassSet).Distinct();
        }

        [HttpGet, Route("{id}/parents/{femaleParentId}/{maleParentId}/skills")]
        public IEnumerable<int> GetInheritedSkills(int id, int femaleParentId, 
            int maleParentId)
        {
            var gender = _characterDao.GetGender(id);
            var maleChild = gender == "Male" ? true : false;
            var femaleChild = gender == "Female" ? true : false;
            return _inheritanceSkillDao.GetByParents(maleParentId, 
                femaleParentId, maleChild, femaleChild);
        }
    }
}
