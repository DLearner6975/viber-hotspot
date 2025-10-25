using System;

using Domain;

using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {
        var users = new List<User>
            {
                new ()
                {
                    Id="doran-id",
                    DisplayName = "Doran",
                    UserName = "doran@test.com",
                    Email = "doran@test.com"
                },
                new()
                {
                    Id="toya-id",
                    DisplayName = "Toya",
                    UserName = "toya@test.com",
                    Email = "toya@test.com"
                },
                new()
                {
                    Id="khalea-id",
                    DisplayName = "Khalea",
                    UserName = "khalea@test.com",
                    Email = "khalea@test.com"
                },
                new()
                {
                    Id="ciara-id",
                    DisplayName = "Ciara",
                    UserName = "ciara@test.com",
                    Email = "ciara@test.com"
                },
                new()
                {
                    Id="gia-id",
                    DisplayName = "Gia",
                    UserName = "gia@test.com",
                    Email = "gia@test.com"
                },
                new()
                {
                    Id="shannon-id",
                    DisplayName = "Shannon",
                    UserName = "shannon@test.com",
                    Email = "shannon@test.com"
                }
            };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

        if (context.Activities.Any())
            return;

        var activities = new List<Activity>
        {
            new()
            {
                Title = "Future Activity 1",
                Date = DateTime.Now.AddMonths(1),
                Description = "Art festival downtown Houston",
                Category = "culture",
                City = "Houston",
                Venue = "Discovery Green, 1500 McKinney St, Houston, TX 77010",
                Latitude = 29.753275,
                Longitude = -95.359127,
                Attendees =
                [
                    new()
                    {
                        UserId = users[0].Id,
                        IsHost = true
                    },       new()
                            {
                                UserId = users[1].Id
                            }
                ]
            },
            new()
            {
                Title = "Future Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Description = "Outdoor concert at the Miller Outdoor Theatre",
                Category = "music",
                City = "Houston",
                Venue = "Miller Outdoor Theatre, 6000 Hermann Park Dr, Houston, TX 77030",
                Latitude = 29.7192,
                Longitude = -95.3909,
                Attendees =
                [
                    new()
                    {
                        UserId = users[1].Id,
                        IsHost = true
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Description = "Weekend foodie event at The Heights",
                Category = "food",
                City = "Houston",
                Venue = "Heights Mercantile, 714 Yale St, Houston, TX 77007",
                Latitude = 29.785048,
                Longitude = -95.396425,
                Attendees = [    new()
                    {
                        UserId = users[2].Id,
                        IsHost = true
                    }]
            },
            new()
            {
                Title = "Future Activity 4",
                Date = DateTime.Now.AddMonths(4),
                Description = "Tech meetup at Station Houston",
                Category = "tech",
                City = "Houston",
                Venue = "The Ion Houston, 4201 Main St, Houston, TX 77002",
                Latitude = 29.733732,
                Longitude = -95.384347,
                Attendees = [

                    new()
                    {
                        UserId = users[3].Id,
                        IsHost = true
                    }
                ]
            },
            new()
            {
                Title = "Future Activity 5",
                Date = DateTime.Now.AddMonths(5),
                Description = "Movie night at Rooftop Cinema Club Uptown",
                Category = "film",
                City = "Houston",
                Venue = "Rooftop Cinema Club Uptown, 1700 Post Oak Blvd, Houston, TX 77056",
                Latitude = 29.750826,
                Longitude = -95.460377,
                Attendees = [
                    new()
                    {
                        UserId = users[4].Id,
                        IsHost = true
                    }]
            },
            new()
            {
                Title = "Future Activity 6",
                Date = DateTime.Now.AddMonths(6),
                Description = "Jazz evening at House of Blues Houston",
                Category = "music",
                City = "Houston",
                Venue = "House of Blues, 1204 Caroline St, Houston, TX 77002",
                Latitude = 29.753242,
                Longitude = -95.364389,
                Attendees = [
                    new()
                    {
                        UserId = users[1].Id,
                        IsHost = true
                    },
                    new()
                    {
                        UserId = users[0].Id,
                        IsHost = false
                    }]
            },
            new()
            {
                Title = "Future Activity 7",
                Date = DateTime.Now.AddMonths(-1),
                Description = "Museum District day trip",
                Category = "culture",
                City = "Houston",
                Venue = "Museum of Fine Arts, 1001 Bissonnet St, Houston, TX 77005",
                Latitude = 29.7255,
                Longitude = -95.3903,
                Attendees = [
                new()
                    {
                        UserId = users[0].Id,
                        IsHost = true
                    }]
            },
            new()
            {
                Title = "Future Activity 8",
                Date = DateTime.Now.AddMonths(8),
                Description = "Hiking and nature outing at Memorial Park",
                Category = "outdoors",
                City = "Houston",
                Venue = "Memorial Park, 6501 Memorial Dr, Houston, TX 77007",
                Latitude = 29.7633,
                Longitude = -95.4427,
                Attendees = [
                    new()
                    {
                        UserId = users[5].Id,
                        IsHost = true
                    },
                    new()
                    {
                        UserId = users[2].Id,
                        IsHost = false
                    },
                    new()
                    {
                        UserId = users[3].Id,
                        IsHost = false
                    },
                    new()
                    {
                        UserId = users[4].Id,
                        IsHost = false
                    },

                    ]
            },
        };

        context.Activities.AddRange(activities);
        await context.SaveChangesAsync();

    }
}
