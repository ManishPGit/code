using Microsoft.EntityFrameworkCore;

namespace cerbtestapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<CustomerOrder> CustomerOrders  => Set<CustomerOrder>();

        
    }
}
