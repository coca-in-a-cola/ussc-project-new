using USSC.Entities;

namespace USSC.Services;

// create BaseEntity

public interface IEfRepository<T> where T: BaseEntity
{
    List<T> GetAll();
    T GetById(Guid id);
    Task<Guid> Add(T entity);
    Task<Guid> Update(T entity);
    Task Delete(T entity);
}