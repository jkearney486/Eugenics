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
        private readonly IClassSkillDao _classSkillDao;
        private readonly ICharacterSkillDao _characterSkillDao;
        private readonly IInheritanceClassSetDao _inheritanceClassSetDao;
        private readonly IClassPromotionDao _classPromotionDao;

        public CharactersController(ICharacterDao characterDao,
            ISupportDao supportDao, IClassSetDao classSetDao,
            IClassPromotionDao classPromotionDao,
            IClassSkillDao classSkillDao,
            ICharacterSkillDao characterSkillDao,
            IInheritanceClassSetDao inheritanceClassSetDao)
        {
            _characterDao = characterDao;
            _supportDao = supportDao;
            _classSetDao = classSetDao;
            _classSkillDao = classSkillDao;
            _characterSkillDao = characterSkillDao;
            _classPromotionDao = classPromotionDao;
            _inheritanceClassSetDao = inheritanceClassSetDao;
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

        [HttpGet, Route("{id}/classes/all")]
        public IEnumerable<int> GetAllClasses(int id)
        {
            return _GetAllClasses(id);
        }

        [HttpGet, Route("{id}/parents/{femaleParentId}/{maleParentId}/classes")]
        public IEnumerable<int> GetClasses(int id, int femaleParentId, 
            int maleParentId)
        {
            return _GetChildClasses(id, femaleParentId, maleParentId);
        }

        [HttpGet, Route("{id}/skills")]
        public IEnumerable<int> GetSkills(int id)
        {
            return _GetCharacterSkills(id);
        }

        [HttpGet, Route("{id}/parents/{femaleParentId}/{maleParentId}/skills")]
        public IEnumerable<int> GetInheritedSkills(int id, int femaleParentId, 
            int maleParentId)
        {
            var gender = _characterDao.GetGender(id);
            var maleChild = gender == "Male" ? true : false;
            var femaleChild = gender == "Female" ? true : false;
            var childBaseClasses = _GetChildClasses(id, femaleParentId, maleParentId);
            var childPromotedClasses = _classPromotionDao.GetPromotions(childBaseClasses);
            var childClasses = childBaseClasses.Union(childPromotedClasses).Distinct();
            var childSkills = _classSkillDao.GetSkills(childClasses);
            var femaleParentClasses = _GetAllClasses(femaleParentId);
            var maleParentClasses = _GetAllClasses(maleParentId);
            var parentClasses = femaleParentClasses.Union(maleParentClasses).Distinct();
            var parentSkills = _classSkillDao.GetInheritableSkills(parentClasses, maleChild, femaleChild);
            var maleParentSkills = _GetCharacterSkills(maleParentId);
            var femaleParentSkills = _GetCharacterSkills(femaleParentId);
            parentSkills = parentSkills.Union(maleParentSkills).Union(femaleParentSkills).Distinct();
            return parentSkills.Distinct().Except(childSkills);
        }

        private IEnumerable<int> _GetChildClasses(int id, int femaleParentId,
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

        private IEnumerable<int> _GetAllClasses(int id)
        {
            var baseClasses = _classSetDao.GetByCharacterId(id);
            var promotions = _classPromotionDao.GetPromotions(baseClasses);
            return baseClasses.Union(promotions).Distinct();
        }

        private IEnumerable<int> _GetCharacterSkills(int id)
        {
            return _characterSkillDao.GetSkillsByCharacter(id);
        }
    }
}
