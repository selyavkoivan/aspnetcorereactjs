using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DistanceLearningSystem.Models.Cloudinary;

namespace DistanceLearningSystem.Controllers.Services.CloudinaryService;

public class CloudinaryUploader
{
    private static readonly Cloudinary _cloudinary;

    static CloudinaryUploader()
    {
        var account = new Account(CloudinaryValues.Cloud, CloudinaryValues.ApiKey, CloudinaryValues.ApISecret);
        _cloudinary = new Cloudinary(account);
    }

    public static async Task<ImageUploadResult> UploadAsync(IFormFile file)
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, file.OpenReadStream())
        };
        return await _cloudinary.UploadAsync(uploadParams);
    }
}