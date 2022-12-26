namespace USSC.Dto;

public class ReviewedTestCase : AddedTestCase
{
    public string Comment { get; set; }
    public bool Allow { get; set; }
}