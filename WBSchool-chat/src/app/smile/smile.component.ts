import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SocketService } from '../socket/socket.service';
import { selectChatGroup } from '../store/selectors/groups.selectors';

const smiles = `https://i.ibb.co/JvXrJJV/CD195156-7-F41-4042-86-E9-46-A8-D1-F3-C634.png
https://i.ibb.co/D7xKDcT/15464569-0958-4571-BAB2-FBF89556-EFE7.png
https://i.ibb.co/NN4VWvV/21970-C66-9-B51-44-BB-8-C9-F-19-FA66-C11978.png
https://i.ibb.co/vDBvKGN/E39841-FB-5-A16-44-AF-A695-2446-DE9866-FD.png
https://i.ibb.co/0KpyTvM/8-F097895-7429-4-DE3-A7-EC-4-BAA14723835.png
https://i.ibb.co/LZxjnV4/B2-E7-E92-E-4-D5-F-4-A6-F-9-B64-A5-D2-A3-B73-BBB.png
https://i.ibb.co/QKQYT1X/1-ADB43-C5-B79-C-403-D-A89-B-C04-A7-DC41664.png
https://i.ibb.co/k4G8vgB/762717-F9-C893-4699-973-E-C6-EC4-B02-F985.png
https://i.ibb.co/CnJX3fY/DD9-B7-D4-F-3439-4457-855-B-A15-C012-A7950.png
https://i.ibb.co/fkwMLrb/9-D9-AC381-B14-D-4-F82-8-C04-E5-A4-D37-F8-F17.png
https://i.ibb.co/ncv1RTb/33683024-CFF6-453-F-BCA6-21685-AD167-EE.png
https://i.ibb.co/QHkK6Th/34738467-F6-B5-4-C23-9-C39-FD6-A43048051.png
https://i.ibb.co/3v5vj79/8-EBBD31-B-0-DE2-45-AC-82-A4-5502464-E2559.png
https://i.ibb.co/SrCFQ4Y/DE3841-B0-2-F5-D-47-B1-9397-7797-E7-B96237.png
https://i.ibb.co/cJXqmJB/DE3-B129-C-136-B-4943-BDC5-43-F4-C27809-C0.png
https://i.ibb.co/XXsTNR2/929904-C8-5124-4258-A32-A-FE662-B429929.png
https://i.ibb.co/31B0fJF/14-B300-F2-DF3-E-45-A8-8-A65-8-A7-D187563-D4.png
https://i.ibb.co/b61YkR5/6-A4-BF9-A9-1-EE5-4-C5-F-9-A72-9694-E0-C0-CC60.png
https://i.ibb.co/HGrJKzM/5-A8-C5501-5756-4044-A26-C-8442245303-D2.png
https://i.ibb.co/3RvdvLr/B749-ECD0-53-E9-4-DAB-8878-54259-ED637-E9.png
https://i.ibb.co/sVXnyjy/13-F96-BBE-0-D10-4065-9-E69-23-C15-C076-C75.png
https://i.ibb.co/p3dnQvS/44-A8-A88-D-7627-4-CB3-8-F42-19-D081779208.png
https://i.ibb.co/7CCFMKY/C58294-EB-3-A65-415-D-A171-9-CE7-AA5233-E1.png
https://i.ibb.co/Kh1y7x7/C9-A90601-4-D69-4-D67-B453-7-B5-B06827708.png
https://i.ibb.co/8bPSg8M/81-E07514-71-EC-47-B3-9-CB2-C2-BFF3-B6-D205.png
https://i.ibb.co/rsZWqWn/01410893-D600-4-E81-8-AB9-992-D40-C210-E7.png
https://i.ibb.co/k004bW1/F669-B4-EB-EEC4-457-D-A590-5-D21000-C36-CA.png
https://i.ibb.co/VDXzDT8/5-E9-C3544-D5-AA-4157-8-D16-0-AC517-F65433.png
https://i.ibb.co/dBn4dTD/C50-F873-A-DC53-491-D-8-AF2-129345343905.png
https://i.ibb.co/CK153W8/57273-DD8-8-EB1-455-D-B5-DA-7-F8-C2126-DF41.png
https://i.ibb.co/Sf3V4k7/0-D1542-DA-1-BA9-4-E8-B-96-B2-D0409563-C8-B2.png
https://i.ibb.co/xGXk1LG/FEAF1-AE1-819-D-4561-B6-B5-9-A6-D05045566.png
https://i.ibb.co/HHvd0tH/15-DC6-B17-B246-40-F2-BDE0-6178518863-AA.png
https://i.ibb.co/2hW9f9T/6-B9-D67-B2-0-D26-4974-A70-A-BCE4-F45-D1-E8-D.png
https://i.ibb.co/288b2LW/D0-CA989-B-B0-C8-401-A-AC7-A-9932118-CE6-A0.png
https://i.ibb.co/tYcmbx6/29-ACEB0-B-490-A-4983-9823-BA02-C4-E02-A4-A.png
https://i.ibb.co/MB7zGjN/FB0-B519-C-28-CC-4733-BDC0-F1315103-EF0-A.png
https://i.ibb.co/86WwvFq/3-FF1-B03-C-6071-4787-9-C1-C-30-BB09-A4-B933.png
https://i.ibb.co/6m1f7G6/CB63925-F-0-CAF-420-E-ACA7-1-BEDF4128-FF4.png
https://i.ibb.co/YWSzzks/F9904-FAC-6604-4-FF2-BAF6-63219-D750680.png
https://i.ibb.co/g9fzCvt/851-C266-E-054-F-4-CBF-81-A7-F4-B8-BA9-BDE5-A.png
https://i.ibb.co/qB3qH3C/EF1-A7-BD8-45-FB-46-C1-A15-B-1498-A52604-AC.png
https://i.ibb.co/f1MG3sm/3-CF52135-1-B72-4-B90-8644-0-A074603-E9-BD.png
https://i.ibb.co/PmXJJr1/224535-C2-77-D6-4-EDB-9-CF8-E178-FEF76-B5-C.png
https://i.ibb.co/mhwGZQ1/BC77232-A-4-DCE-4-D19-867-C-DA06-DA6-F21-F1.png
https://i.ibb.co/GFvFZnV/1-A753995-D8-EB-4-BE0-B772-50-C99197-BA9-F.png
https://i.ibb.co/4jWQMpc/780-E4-CBF-B29-E-4804-BCAE-23-C245649-E0-F.png
https://i.ibb.co/6r5qRnJ/BD835-DBD-8-FC3-4-E49-92-AA-BF326-F38-F9-D2.png`

@Component({
  selector: 'app-smile',
  templateUrl: './smile.component.html',
  styleUrls: ['./smile.component.scss']
})
export class SmileComponent implements OnInit {

  smilesList: string[] = smiles.split('\n');

  chatID = '';
  smileSRC = '';
  private chatGroup$: Observable<string> = this.store$.pipe(
    select(selectChatGroup)
  );
  constructor(
    private store$: Store,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.chatGroup$.subscribe((id) => this.chatID = id);
  }

  onClick(e: Event) {
    this.smileSRC = (e.target as HTMLImageElement).src;
    this.socketService.send(this.chatID, {text: this.smileSRC});
  }
}
