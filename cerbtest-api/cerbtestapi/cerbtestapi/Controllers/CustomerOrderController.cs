using cerbtestapi.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace cerbtestapi.Controllers
{
    //api url http://localhost:5000/api/customerorder/customerorders

    [ApiController]
    [Route("api/[controller]")]
    public class CustomerOrderController : ControllerBase
    {
        private readonly DataContext _context;
        public CustomerOrderController(DataContext context)
        {
            _context = context;
        }


        
        [HttpGet]
        [Route("Customers")]
        public async Task<ActionResult<List<Customer>>> GetCustomers()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        
        [HttpGet]
        [Route("Orders")]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            return Ok(await _context.Orders
            .FromSqlRaw("select [OrderID], c.CompanyName as CustomerName,  e.FirstName + ' ' + e.LastName as EmployeeName, [OrderDate], " +
                                    "[RequiredDate], [ShippedDate], s.CompanyName [ShipVia], [Freight], [ShipName], [ShipAddress], [ShipCity], [ShipRegion], [ShipPostalCode], [ShipCountry] " +
                                    "from orders o " +
                                    "join Customers c on o.CustomerID = c.CustomerID " +
                                    "join Employees e on o.EmployeeID = e.EmployeeID " +
                                    "join Shippers s on s.ShipperID = o.ShipVia")
            .ToListAsync());
        }


        [HttpGet]
        [Route("CustomerOrders")]
        public async Task<ActionResult<List<CustomerOrder>>> GetCustomerOrders()
        {
            return Ok(await _context.CustomerOrders
            .FromSqlRaw("select c.CustomerID, c.CompanyName as CustomerName, c.ContactName, c.ContactTitle, o.OrderID, p.ProductName, " +
                "o.OrderDate, o.RequiredDate, o.ShippedDate, " +
                "s.CompanyName as ShipVia, o.Freight, o.ShipName, o.ShipAddress, o.ShipCity, o.ShipRegion, o.ShipPostalCode, o.ShipCountry " +
                "from orders o " +
                "join customers c " +
                "on o.CustomerID = c.CustomerID " +
                "join [Order Details] od " +
                "on od.OrderID = o.OrderID " +
                "join Products p " +
                "on p.ProductID = od.ProductID " +
                "join Shippers s " +
                "on s.ShipperID = o.ShipVia").ToListAsync());
        }
    }
}
