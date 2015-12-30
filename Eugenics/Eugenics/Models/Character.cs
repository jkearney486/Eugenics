using System.Collections.Generic;

namespace Eugenics.Models
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public int ModStr { get; set; }
        public int ModMag { get; set; }
        public int ModSkl { get; set; }
        public int ModSpd { get; set; }
        public int ModLck { get; set; }
        public int ModDef { get; set; }
        public int ModRes { get; set; }
        public int? ParentID { get; set; }
    }
}
