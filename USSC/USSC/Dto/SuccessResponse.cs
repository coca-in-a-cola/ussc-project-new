namespace USSC.Dto;

public class SuccessResponse
{
    public bool Success { get; }

    public SuccessResponse(bool success)
    {
        Success = success;
    }
}