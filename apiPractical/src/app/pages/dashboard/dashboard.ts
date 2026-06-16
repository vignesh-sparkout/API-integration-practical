import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Api, Post } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  user: any;
  posts: Post[] = [];

  constructor(
    private auth: Auth,
    private router: Router,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.user = {
      username: this.auth.getCurrentUserName()
    };

    this.getData();
  }

  getData(): void {
    this.api.getData().subscribe((res) => {
      this.posts = res.slice(0, 5);
      console.log('GET:', res);
    });
  }

  postData(): void {
    const data: Post = {
      userId: 1,
      title: 'New Post',
      body: 'This is post request'
    };

    this.api.postData(data).subscribe((res) => {
      console.log('POST:', res);
    });
  }

  putData(): void {
    const data: Post = {
      id: 1,
      userId: 1,
      title: 'Updated Post',
      body: 'This is put request'
    };

    this.api.putData(1, data).subscribe((res) => {
      console.log('PUT:', res);
    });
  }

  patchData(): void {
    const data = {
      title: 'Patched Title'
    };

    this.api.patchData(1, data).subscribe((res) => {
      console.log('PATCH:', res);
    });
  }

  deleteData(): void {
    this.api.deleteData(1).subscribe(() => {
      console.log('DELETE: Data deleted successfully');
    });
  }

  deleteByPost(id: number): void {
  this.api.deleteUsingPost(id).subscribe((res) => {
    console.log('DELETE using POST:', res);
    this.posts = this.posts.filter(post => post.id !== id);
  });
}

deleteByPut(id: number): void {
  this.api.deleteUsingPut(id).subscribe((res) => {
    console.log('DELETE using PUT:', res);
    this.posts = this.posts.filter(post => post.id !== id);
  });
}

deleteByPatch(id: number): void {
  this.api.deleteUsingPatch(id).subscribe((res) => {
    console.log('DELETE using PATCH:', res);
    this.posts = this.posts.filter(post => post.id !== id);
  });
}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}