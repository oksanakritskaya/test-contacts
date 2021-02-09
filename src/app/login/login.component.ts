import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";
import {Store} from "@ngxs/store";
import {setUser} from "../store.actions";
import {catchError, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {UserData} from "../interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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

  getUser = (): boolean => {
    this.http.getUser(this.formGroup.value)
      .pipe(
        tap((user: UserData) => {
          this.store.dispatch(new setUser(user))
            .subscribe(() => this.router.navigateByUrl('', {replaceUrl: true}));
        }),
        catchError((message: Error) => {
          this._bottomSheet.open(BottomSheetComponent);

          return EMPTY;
        })
      )
      .subscribe();

    return false;
  }
}
