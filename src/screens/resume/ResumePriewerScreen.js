import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform,Image } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { COLORS, icons, images } from '../../constants';


const ResumePreviewScreen = ({ route, navigation }) => {
  const { resumeData } = route.params;


  const renderSectionContent = (section) => {
    return section.items.map((item, index) => {
      if (typeof item === 'string') {
        // For Skills, Languages, and Interests sections
        return (
          <View key={index} style={styles.flexRow}>
            <Text style={styles.contentText}>- {item}</Text>
          </View>
        );
      } else {
        // For other sections with key-value pairs
        return (
          <View key={index} style={styles.itemContainer}>
            {Object.keys(item).map((key) => (
              <Text key={key} style={styles.contentText}>
                <Text style={styles.boldText}>{key.replace(/([A-Z])/g, ' $1')}: </Text>
                {item[key]}
              </Text>
            ))}
          </View>
        );
      }
    });
  };

  const generateResumeHTML = () => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #000;
              margin-bottom: 10px;
              position: relative;
            }
            .section-title::after {
              content: '';
              display: block;
              width: 100%;
              border-bottom: 1px solid black;
              margin-top: 5px;
            }
            .content-text {
              font-size: 16px;
              color: #333;
              margin-bottom: 5px;
            }
            .personal-info {
              margin-bottom: 20px;
              line-height: 1.6;
            }
            .personal-info .name {
              font-weight: bold;
              font-size: 24px; /* Large font size for name */
              margin-bottom: 10px;
            }
            .personal-info .summary-title {
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
            }
            .summary-item {
              font-size: 16px;
              color: #333;
              margin-left: 20px;
            }
            .education-item, .certificate-item {
              font-weight: bold;
              margin-bottom: 10px;
            }
            .education-item-title, .certificate-item-title {
              display: block;
            }
            .education-item-subtitle, .certificate-item-subtitle {
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Resume Preview</h1>
          </div>
  
          <!-- Personal Information Section -->
          ${resumeData.map(section => `
            ${section.title === 'Personal Information' ? `
              <div class="personal-info">
                <div class="name">${section.items.name}</div>
                <div>Email: ${section.items.email}</div>
                <div>Phone: ${section.items.phone}</div>
                <div>Location: ${section.items.location}</div>
                <div>GitHub: <a href="${section.items.github}">${section.items.github}</a></div>
                
                <div class="summary-title">Summary</div>
                <ul>
                  ${section.items.summary.map(summaryItem => `
                    <li class="summary-item">${summaryItem}</li>
                  `).join('')}
                </ul>
              </div>
            ` : `
              <!-- Other Sections (Skills, Languages, Interests, etc.) -->
              <div class="section">
                <div class="section-title">${section.title}</div>
                ${
                  section.title === 'Skills' || section.title === 'Languages' || section.title === 'Interests'
                  ? `<div class="content-text flex-row">${section.items.join(' | ')}</div>`
                  : section.title === 'Experience'
                  ? section.items.map(item => `
                    <div class="experience-details">
                      <div class="experience-title">
                        ${item.company} | ${item.location} - ${item.position} | ${item.date}
                      </div>
                      <div class="experience-description">
                        ${item.description}
                      </div>
                    </div>
                  `).join('')
                  : section.title === 'Education' || section.title === 'Certificates'
                  ? section.items.map(item => `
                    <div class="${section.title.toLowerCase()}-item">
                      <span class="${section.title.toLowerCase()}-item-title">${item.institution || item.certificate}</span>
                      <span class="${section.title.toLowerCase()}-item-subtitle">${item.field || item.date}</span>
                    </div>
                  `).join('')
                  : section.items.map(item => `
                    <div class="content-text">
                      ${typeof item === 'string' ? item : Object.entries(item).map(([key, value]) => `
                        <strong>${key.replace(/([A-Z])/g, ' $1')}: </strong> ${value}
                      `).join('<br>')}
                    </div>
                  `).join('')
                }
              </div>
            `}
          `).join('')}
        </body>
      </html>
    `;
  };
  
  const handleGeneratePDF = async () => {
    try {
      const htmlContent = generateResumeHTML();
      const options = {
        html: htmlContent,
        fileName: 'resume',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      Alert.alert('PDF generated', `PDF saved to ${pdf.filePath}`);
      navigation.navigate('pdfViewer', { filePath: pdf.filePath });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backButton}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resume Preview</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {resumeData.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {renderSectionContent(section)}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => {
          // Placeholder function for generating the resume
          console.log('Generate Resume');
        }}
      >
        <Text style={styles.generateButtonText}  onPress={handleGeneratePDF} >Generate Resume</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
    backgroundColor: COLORS.white, // Make sure the background is set
    padding: 20, // Add some padding for better touch targets
    borderRadius: 10, // Optional: To give rounded corners
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Color of the shadow
        shadowOffset: { width: 0, height: 2 }, // Position of the shadow
        shadowOpacity: 0.2, // Opacity of the shadow
        shadowRadius: 4, // Blur radius of the shadow
      },
      android: {
        elevation: 5, // Shadow elevation for Android
      },
    }),
  },
  backButton: {
   height:20,
   width:20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  scrollView: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    ...COLORS.black,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  generateButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResumePreviewScreen;
