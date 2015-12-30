using System.Collections.Generic;

namespace Eugenics.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxHP { get; set; }
        public int MaxStr { get; set; }
        public int MaxMag { get; set; }
        public int MaxSkl { get; set; }
        public int MaxSpd { get; set; }
        public int MaxLck { get; set; }
        public int MaxDef { get; set; }
        public int MaxRes { get; set; }
        public int PairStr { get; set; }
        public int PairMag { get; set; }
        public int PairSkl { get; set; }
        public int PairSpd { get; set; }
        public int PairLck { get; set; }
        public int PairDef { get; set; }
        public int PairRes { get; set; }
        public int PairMov { get; set; }
        public bool IsBaseClass { get; set; }
    }
}
