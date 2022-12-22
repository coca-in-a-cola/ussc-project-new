namespace USSC.Services;

public interface IService<T>
{
    IEnumerable<T> GetAll();
    T GetById(Guid id);
}