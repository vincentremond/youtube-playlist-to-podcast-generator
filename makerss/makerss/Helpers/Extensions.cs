using System;
using System.Collections.Generic;
using System.Linq;

namespace MakeRss.Helpers
{
    internal static class Extensions
    {
        public static IEnumerable<T1> WhereNotIn<T1, T2, TCompare>(
            this IEnumerable<T1> enumerable1,
            IEnumerable<T2> enumerable2,
            Func<T1, TCompare> emit1,
            Func<T2, TCompare> emit2)
        {
            return from item in enumerable1
                let compare = emit1(item)
                where !enumerable2.Any(i => Equals(compare, emit2(i)))
                select item;
        }
    }
}