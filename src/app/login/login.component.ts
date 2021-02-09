import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from "../http.service";
import {User} from "../interfaces";
import {Router} from "@angular/router";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";
import {Store} from "@ngxs/store";
import {isLogin} from "../store.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpService,
              private router: Router,
              private _bottomSheet: MatBottomSheet,
              private store: Store) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn = (): boolean => {
    this.http.logIn(this.formGroup.value)
      .subscribe((isAuth: boolean) => {
        if (isAuth) {
          this.store.dispatch(new isLogin(this.formGroup.value.login))
            .subscribe(() => this.router.navigate(['']));
        } else {
          this._bottomSheet.open(BottomSheetComponent);
        }
      })

    return false;
  }
}
