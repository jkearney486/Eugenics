using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    public class ClassesController : ApiController
    {
        private readonly IClassDao _classDao;

        public ClassesController(IClassDao classDao)
        {
            _classDao = classDao;
        }

        public IEnumerable<Class> Get()
        {
            return _classDao.GetAll();
        }

        public Class Get(int id)
        {
            return _classDao.GetById(id);
        }
    }
}
