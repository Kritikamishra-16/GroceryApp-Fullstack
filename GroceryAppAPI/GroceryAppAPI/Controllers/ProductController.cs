using GroceryAppAPI.Models;
using GroceryAppAPI.Models.DTO;
using GroceryAppAPI.Repository.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAppAPI.Controllers
{
    [Route("api/[controller]/{action}")]
    [Authorize]
    [ApiController]
    //to tell .net that it is an api controller and we wont be having any views here
    public class ProductController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IProductRepository _productRepository;

        public ProductController(IFileService fs, IProductRepository productRepository)
        {
            this._fileService = fs;
            this._productRepository = productRepository;

        }


        [HttpPost]
        public IActionResult Add([FromForm]Product model)
        {
            var status = new Status();
            if(!ModelState.IsValid)
            {
                status.StatusCode = 0;
                status.Message = "Please enter the valid data";
                return Ok(status);
            }
            if(model.ImageFile != null)
            {
                var fileResult = _fileService.SaveImage(model.ImageFile);
                if(fileResult.Item1==1)
                {
                    model.ProductImage= fileResult.Item2; //getting name of image
                }
                var productResult = _productRepository.Add(model);
                if(productResult)
                {
                    status.StatusCode = 1;
                    status.Message = "Added Successfully!";
                }
                else { 
                    status.StatusCode = 0;
                    status.Message = "Error on adding product";
                }
            }
            return Ok(status);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            var data = _productRepository.GetAll();
            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpPut("{id}")]

        public  IActionResult UpdateProduct(int id, [FromForm] Product model)
        {
            var status = new Status();
            if (!ModelState.IsValid)
            {
                status.StatusCode = 0;
                status.Message = "Please enter the valid data";
                return Ok(status);
            }
            if (model.ImageFile != null)
            {
                var fileResult = _fileService.SaveImage(model.ImageFile);
                if (fileResult.Item1 == 1)
                {
                    model.ProductImage = fileResult.Item2; //getting name of image
                }
                var productResult = _productRepository.UpdateProductAsync(id, model);
                if (productResult)
                {
                    status.StatusCode = 1;
                    status.Message = "Updated Successfully!";
                }
                else
                {
                    status.StatusCode = 0;
                    status.Message = "Error on updating product";
                }
            }
            return Ok(status);
        }

        [HttpDelete("{id}")]
        
        public IActionResult DeleteProduct(int id)
        {
            var status = new Status();

            if (_productRepository.DeleteProduct(id))
            {
                status.StatusCode = 1;
                status.Message = "Deleted Successfully!";
            }
            else
            {
                status.StatusCode = 0;
                status.Message = "Error on deleting product";
            }
            return Ok(status);
        }


    }
}
