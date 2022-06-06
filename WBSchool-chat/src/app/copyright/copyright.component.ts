import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface HeroCoder {
  name: string;
  heroName: string;
  brief: string;
  superpowers: string;
  img: string;
  gitUrl: string;
  socials: {
    github?: string;
    medium?: string;
    telega?: string;
  };
  gitInfo?: heroGitApi;
}

interface heroGitApi {
  avatar_url?: string;
  bio?: string;
  html_url?: string;
  hireable?: string;
  location?: string;
  login?: string;
  name?: string;
}

const heroParty: HeroCoder[] = [
  {
    name: 'Karina',
    heroName: 'Harley',
    brief: 'Game-addicted chatter-box',
    superpowers: 'FE, finding bugs, creating layouts, talking',
    img: 'https://i.pinimg.com/564x/ac/b2/b9/acb2b9e30d4b6dc6fa3af354c6bf5531.jpg',
    gitUrl: 'kkoroleva',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Nikita',
    heroName: 'Batman',
    brief: 'Tough, dark, but powerful',
    superpowers: 'clever, fullstack, but no one is ideal',
    img: 'https://i.pinimg.com/564x/8a/57/0e/8a570e7324c1ca76e36e6ed706fa5831.jpg',
    gitUrl: 'DaoNik',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Nikita',
    heroName: 'Nightwing',
    brief: 'Popular, funny, but not yours',
    superpowers: 'fullstack too, but wont slap you in the face for asking smth',
    img: 'https://i.pinimg.com/564x/83/c2/31/83c231966a360dad194e042ea781c07d.jpg',
    gitUrl: 'BerezhnovN',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Dima',
    heroName: 'the Flash',
    brief: 'Quite, fast-minded; made in Omsk',
    superpowers: 'FE, best problem-solver, the softest voice in the Family',
    img: 'https://i.pinimg.com/564x/79/91/d6/7991d64f36f88d837a6cafa48a9389c6.jpg',
    gitUrl: 'byteCD',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Lenya',
    heroName: 'Marcian Hunter',
    brief: 'The most misterious part of the team',
    superpowers: 'FE, stealth mode, profile-guru',
    img: 'https://i.pinimg.com/564x/95/a7/3a/95a73a44bf13c0c85b369aae09ea8e36.jpg',
    gitUrl: 'leonidrawhide',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Sasha',
    heroName: 'Red Hood',
    brief: 'The fastest learner in the world',
    superpowers: 'FE with benefits; muting Harley, making frontend great again',
    img: 'https://i.pinimg.com/564x/14/55/ed/1455edf7fc59413c74b43cf95ff73b56.jpg',
    gitUrl: 'NaturalViking1999',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Max',
    heroName: 'Cyborg',
    brief: 'Kindness, cleverness, soul',
    superpowers: 'FE with benefits, the Lord of Store',
    img: 'https://i.pinimg.com/564x/85/2e/79/852e7904c4fa7d0a622f91c36b43fec3.jpg',
    gitUrl: 'maksgd',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
  {
    name: 'Pasha',
    heroName: 'Akvalad',
    brief: 'Bold enough to overcome his own weaknesses',
    superpowers: 'FE, never gives up',
    img: 'https://i.pinimg.com/564x/d3/05/07/d305079effff6951dad31e9bc9a4a925.jpg',
    gitUrl: 'pashaaaaaaaaaa',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },

  {
    name: 'Sergey',
    heroName: 'Superman',
    brief: 'Too good to be real',
    superpowers: 'Greatest support ever',
    img: 'https://i.pinimg.com/564x/9e/ff/58/9eff58ac25f6d54ec411cf0c07f88119.jpg',
    gitUrl: 'real3060',
    socials: {
      github: '',
      medium: '',
      telega: '',
    },
  },
];

const gitApiUrl = 'https://api.github.com/users/';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  heroes: HeroCoder[] = [];

  ngOnInit(): void {
    this.heroes = heroParty;

    this.heroes.forEach((hero) => {
      this.http.get<heroGitApi>(gitApiUrl + hero.gitUrl).subscribe((res) => {
        let gitProfile = res;
        hero.socials.github = gitProfile.html_url;
        hero.gitInfo = res;
        this.changeDetectorRef.markForCheck();
      });
    });
  }
}
