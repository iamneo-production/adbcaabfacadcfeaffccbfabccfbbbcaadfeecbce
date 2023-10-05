import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  addMenuForm:FormGroup;
  imageList=[]
  sumbit:boolean =false
  foodImg=[{
    id:1,
    path:'../../../../assets/NoPath - Copy (2)@2x.png',
    selected: false
  },{
    id:2,
    path:'../../../../assets/NoPath - Copy (3)@2x.png',
    selected: false
  },{
    id:3,
    path:'../../../../assets/NoPath - Copy (4)@2x.png',
    selected: false
  },{
    id:4,
    path:'../../../../assets/NoPath - Copy@2x.png',
    selected: false
  },{
    id:5,
    path:'../../../../assets/NoPath@2x.png',
    selected: false
  }]
  constructor(private fb:FormBuilder,private service:UsersService,private toastr:ToastrService, private dialogRef: MatDialogRef<AdditemComponent>) { }

  ngOnInit(): void {
    const formControls = {};
    this.foodImg.map((item) => {
      formControls[item.id] = new FormControl(item.path=='../../../../assets/NoPath - Copy (2)@2x.png');
      item["selected"]=false
      return item
    });
    this.addMenuForm = this.fb.group({
      item_name:['',[Validators.required]],
      item_category:['',Validators.required],
      sub_category:['',Validators.required],
      price:['',[Validators.required,Validators.pattern(/^[0-9]*$/)]],
      description:['',[Validators.required,Validators.maxLength(100)]],
      selectedImages: [[], this.validateSelectedImages()],
      ...formControls
    })


  }



  validateSelectedImages(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedImages = control.value;
      if (!selectedImages || selectedImages.length === 0) {
        return { 'noImagesSelected': true };
      }
      return null;
    };
  }
  imageSlected:boolean=false

  selectItem(items) {
    items.selected=!items.selected
    console.log(items.selected);

    this.foodImg.forEach((item) => {
      this.addMenuForm.get(`${item.id}`)?.setValue(item === items ? item.path : false);
    });

    const selectedImages = this.foodImg
    .filter(img => img.selected)
    .map(img => img.path);
  // Update the selectedImages form control
  this.addMenuForm.get('selectedImages')?.setValue(selectedImages);

  // Clear the validation error if at least one image is selected
  if (selectedImages.length > 0) {
    this.addMenuForm.get('selectedImages')?.setErrors(null);
  } else {
    // Set the 'noImagesSelected' error if no images are selected
    this.addMenuForm.get('selectedImages')?.setErrors({ 'noImagesSelected': true });
  }
  }
  handleItemAdd(){
    this.sumbit=true
    if(this.addMenuForm.valid){
      const item={
        "name":this.addMenuForm.get('item_name').value,
        "category":this.addMenuForm.get('item_category').value,
        "subCategory":this.addMenuForm.get('sub_category').value,
        "status":"available",
        "description":this.addMenuForm.get('description').value,
        "price":this.addMenuForm.get('price').value
    }
    for(let i=1; i<=5; i++){
      if(this.addMenuForm.get(`${i}`).value && this.addMenuForm.get(`${i}`).value !==true && this.addMenuForm.get(`${i}`).value !==false)
      {
        item['imgPath']=this.addMenuForm.get(`${i}`).value
      }
    }

    this.service.addMenu(item).subscribe(res=>{
      if(!res['error']){
        this.toastr.success(res['message']);
        this.dialogRef.close();
      }else{
        this.toastr.error(res['message'])
      }
    })
    }
  }
}
