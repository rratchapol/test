import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.Form = this.fb.group({
      users: this.fb.array([])
    });
  }
  onSubmit() {
    console.log(this.Form.value);
  }

  
  // Users
  users(): FormArray {
    return this.Form.get('users') as FormArray;
  }

  addUser() {
    const userGroup = this.fb.group({
      firstname: [''],
      lastname: [''],
      phone: [''],
      talents: this.fb.array([])
    });
    this.users().push(userGroup);
  }

  removeUser(usersIndex: number) {
    this.users().removeAt(usersIndex);
  }
  // Users

  
  // Talents
  userTalents(usersIndex: number): FormArray {
    return this.users()
      .at(usersIndex)
      .get('talents') as FormArray;
  }

  addUserTalent(usersIndex: number){
    const talentGroup = this.fb.group({
      talent: '',
      details: this.fb.array([]) 
    });
    this.userTalents(usersIndex).push(talentGroup);
  }

  removeUserTalent(usersIndex: number, talentIndex: number) {
    this.userTalents(usersIndex).removeAt(talentIndex);
  }
  // Talents


  // detail
  addUserDetail(usersIndex: number, talentIndex: number){
    const detailControl = this.fb.control('');
    this.userDetails(usersIndex, talentIndex).push(detailControl);
  }

  userDetails(usersIndex: number, talentIndex: number): FormArray {
    return this.userTalents(usersIndex)
      .at(talentIndex)
      .get('details') as FormArray;
  }

  removeUserDetail(usersIndex: number, talentIndex: number, detailIndex: number) {
    this.userDetails(usersIndex, talentIndex).removeAt(detailIndex);
  }
  //detail
}