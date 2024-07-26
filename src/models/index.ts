import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";

Category.hasMany(Course, { as: "courses" });

Course.belongsTo(Category);
Course.belongsToMany(User, { through: Like });
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });
Course.hasMany(Episode, { as: "episodes" });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Like });
User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

export { Category, Course, Episode, Favorite, Like, User };
