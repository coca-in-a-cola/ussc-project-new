using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace USSC.Attributes;

public class EmailAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        var r = new Regex(@"^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$");
        if (value is not string)
            return false;
        return r.IsMatch(value.ToString());
    }
}