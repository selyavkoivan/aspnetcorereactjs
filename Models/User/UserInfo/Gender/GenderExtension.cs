using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Localization;

namespace mIndeleev.Models.User.UserInfo.Gender;

public static class GenderExtension
{
    public static string ToString(this Gender gender, IViewLocalizer localizer) => localizer[$@"{gender}"].Value;

    public static string ToString(this Gender gender, IStringLocalizer localizer) =>localizer[$@"{gender}"];


    public static string GetNumber(this Gender gender) => ((int) gender).ToString();
}