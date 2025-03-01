import {Component} from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { VideoModule } from '../../../shared/modules/video.module';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';
import {CategoryModel} from '../../../models/category.model';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, MaterialModule, VideoModule, CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {


  products: CategoryModel[] = [
    {
      id: '1',
      image:'https://i.pinimg.com/736x/54/68/a3/5468a33bc43e258995f15ad01e5ad7cc.jpg',
      name: 'Game PC',
      videos:1490,
    },
    {
      id: '2',
      image:'https://i.pinimg.com/736x/7c/0e/39/7c0e3921e63aba8ada652f9070b963ef.jpg',
      name: 'Game Mobile',
      videos: 454,
    },
    {
      id: '3',
      image: 'https://i.pinimg.com/736x/d5/62/d4/d562d4205927c8d1ca5eed0adcaaa25d.jpg',
      name: 'Music',
      videos: 854,
    },
    {
      id: '4',
      image:'https://gamek.mediacdn.vn/133514250583805952/2020/2/22/photo-1-1582365528361302861846.jpg',
      name: 'Review Game',
      videos: 9420,
    },
    {
      id: '5',
      image: 'https://i.pinimg.com/736x/16/21/2d/16212d476ce290d6de5bfd10cfe7a25e.jpg',
      name: 'Running & Gym',
      videos: 857,
    },
    {
      id: '6',
      image: 'https://i.pinimg.com/736x/65/28/a7/6528a789ad86221f9b12ceca9fdac082.jpg',
      name: 'Esports',
      videos: 185,
    },
    {
      id: '7',
      image:'https://i.pinimg.com/736x/81/ae/2d/81ae2defca3fda8796ff5517e0996a06.jpg',
      name: 'TV Shows',
      videos:878,
    },
    {
      id: '8',
      image:'https://logopond.com/logos/f9d46b09f3bab7f57d0c2e3030cc0ada.png',
      name: 'Celebrities',
      videos: 951,
    },
    {
      id: '9',
      image:'https://i.pinimg.com/736x/d5/f2/6f/d5f26f6aacb36e1419bee0894ce5344f.jpg',
      name: 'History & Mythology',
      videos: 654,
    },
    {
      id: '10',
      image:'https://i.pinimg.com/736x/18/95/5f/18955f38d63542ce45fe8530bae81431.jpg',
      name: 'Travel & Food',
      videos: 843,
    },
    {
      id: '11',
      image:'https://i.pinimg.com/736x/86/74/ed/8674ed368a3b0be0e40c23316d607095.jpg',
      name: 'Feature Films',
      videos: 354,
    },
    {
      id: '12',
      image:'https://i.pinimg.com/736x/7c/98/9a/7c989ab0dcf37848a2415fcad95bdcd3.jpg',
      name: 'TV Series',
      videos: 324,
    },
    {
      id: '13',
      image:'https://i.pinimg.com/736x/9e/03/f1/9e03f1f6c50332ba2ea483d4349a10b8.jpg',
      name: 'Animated Movies',
      videos:265,
    },
    {
      id: '14',
      image:'https://i.ytimg.com/vi/xinc3jXmGN0/maxresdefault.jpg',
      name: 'Movie Reviews',
      videos: 159,
    },
    {
      id: '15',
      image:'https://media.licdn.com/dms/image/D5612AQEG3bi9VColdg/article-cover_image-shrink_720_1280/0/1696520557339?e=2147483647&v=beta&t=f6iM11v1GUfo-g0OiF7Cx3IaNV7b1JB9a186mfGfeek',
      name: 'Film Industry News',
      videos: 753,
    },
    {
      id: '16',
      image:'https://i.pinimg.com/736x/8b/c2/54/8bc25406b37ba91bbea301cfd49336f0.jpg',
      name: 'Drama',
      videos: 346,
    },
    {
      id: '17',
      image:'https://img.freepik.com/premium-vector/editable-text-effect-comedy-show-style-can-be-use-make-title_77703-361.jpg',
      name: 'Comedy',
      videos: 524,
    },
    {
      id: '18',
      image:'https://img.freepik.com/premium-photo/soccer-ball-flight-graffiti-style-bright-background_465502-5232.jpg',
      name: 'Football',
      videos: 162,
    },
    {
      id: '19',
      image:'https://i.pinimg.com/736x/23/74/3d/23743dab8a0a532d8836d5f100ddd536.jpg',
      name: 'Basketball',
      videos:214,
    },
    {
      id: '20',
      image:'https://musicnonstop.today/wp-content/uploads/2024/01/Dancefestopia-image-powered-by-DALL-E-3.jpg',
      name: 'Concerts & Festivals',
      videos: 109,
    },
    {
      id: '21',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvPaIoGX79uxTyFbmjltl-Bq2Zd8YyfbLl8auOC8PpGD_mcDRrREcvyHDuGV4ezGF4aU&usqp=CAU',
      name: 'Martial Arts & Boxing',
      videos: 300,
    },
    {
      id: '22',
      image:'https://illustrarch.com/wp-content/uploads/2023/01/AR_VR_person_with_VR_headset.original.png',
      name: 'VR & AR Games',
      videos: 421,
    },
    {
      id: '23',
      image:'https://thumb.photo-ac.com/d3/d3690d75f0a0af9f49ff6637f744b470_t.jpeg',
      name: 'Documentaries',
      videos: 122 ,
    },
    {
      id: '24',
      image:'https://i.pinimg.com/736x/c8/c7/eb/c8c7ebad7e1996332991916cb0da8719.jpg',
      name: 'Formula 1 & Motorsport',
      videos: 422,
    },
  ];
}
