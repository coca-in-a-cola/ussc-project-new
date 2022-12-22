using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace USSC.Attributes;

public class StringInputAttribute : ValidationAttribute
{
    // требует проверки
    public override bool IsValid(object? value)
    {
        var r1 = new Regex("^[a-zA-Z]+$");
        var r2 = new Regex("^[а-яА-Я]+$");
        if (value is not string)
            return false;
        return r1.IsMatch(value.ToString()) || r2.IsMatch(value.ToString());
    }
}